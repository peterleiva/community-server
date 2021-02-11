import { ReplyModel, ReplyDocument } from 'src/topics/reply.model';
import { UserModel } from 'src/users';
import ReplyFactory from 'test/factories/reply';
import databaseSetup from 'test/helpers/database';

describe('Reply', () => {
  databaseSetup();
  let reply: ReplyDocument;

  beforeEach(async () => {
    reply = await ReplyModel.create(await ReplyFactory.build());
  });

  it('Autopopulate author', () => {
    expect(reply.author).toBeInstanceOf(UserModel);
  });

  describe('Middleware', () => {
    let response$: () => Promise<ReplyDocument>;

    beforeEach(async () => {
      response$ = async () =>
        await ReplyModel.create(await ReplyFactory.build());
    });

    it('Set topic automatically when no topic is set', async () => {
      const response = await response$();
      reply.replies.push(response);
      reply = await reply.save();

      expect(reply.replies.map((r) => r.repliedTo)).toContain(reply._id);
    });

    it('Change topic to the top-level topic', async () => {
      reply.replies.push(await response$());
      reply = await reply.save();

      const topics = reply.replies.map((r) => r.topic);
      expect(topics).toContain(reply.topic);
    });
  });

  describe('validations', () => {
    describe('.replies', () => {
      describe('Validating Topic', () => {
        it("Is invalid when replies doens't have same topic", async (done) => {
          const response = ReplyModel.create(
            await ReplyFactory.build({ repliedTo: reply._id })
          );

          reply.replies?.push(await response);

          reply.save((error) => {
            expect(error?.errors?.['replies.0']?.message).toEqual(
              'Replies topic must be the same as repliedTo'
            );

            done();
          });
        });

        it("Is invalid when replies' repliedTo isn't id", async (done) => {
          const repliedTo = await ReplyModel.create(await ReplyFactory.build());
          const response = ReplyModel.create(
            await ReplyFactory.build({ repliedTo: repliedTo._id })
          );

          reply.replies?.push(await response);

          reply.save((error) => {
            expect(error?.errors['replies.0']?.message).toEqual(
              `replies.0' repliedTo must set id to its own parent`
            );

            done();
          });
        });

        it('Is valid when have the same topic', async (done) => {
          const response = await ReplyModel.create(
            await ReplyFactory.build({
              repliedTo: reply.id,
              topic: reply.topic,
            })
          );

          reply.replies?.push(response);

          reply.save((error) => {
            expect(error).toBeNull();
            done();
          });
        });
      });
    });
  });

  describe('Adding a response', () => {
    let response: ReplyDocument;

    beforeEach(async () => {
      response = await ReplyModel.create(
        await ReplyFactory.build({ repliedTo: reply._id, topic: reply.topic })
      );

      reply.replies?.push(response);
      await reply.save();
    });
    it('Save reply to replies list', () => {
      expect(reply.replies).toEqual(
        expect.arrayContaining([expect.objectContaining({ _id: response._id })])
      );
    });

    it("Have response's topic equal to reply", () => {
      expect(response.topic).toBe(reply.topic);
    });

    it("Have response' repliedTo equal to reply", () => {
      expect(response.repliedTo).toBe(reply._id);
    });

    it('added reply has the same topic as the top-level reply', () => {
      reply;
    });
  });
});
