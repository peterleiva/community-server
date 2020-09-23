import { ReplyModel, ReplyDocument } from 'src/topics/reply.model';
import { UserModel } from 'src/users';
import ReplyFactory from 'test/factories/reply';
import databaseSetup from 'test/utils/database';

describe('Reply', () => {
  databaseSetup();
  let reply: ReplyDocument;

  beforeEach(async () => {
    reply = await ReplyModel.create(await ReplyFactory.build());
  });

  it('Autopopulate author', () => {
    expect(reply.author).toBeInstanceOf(UserModel);
  });

  describe('validations', () => {
    describe('.replies', () => {
      describe('Validating Topic', () => {
        it('Is invalid when does not have the same topic', async () => {
          const response = await ReplyModel.create(
            await ReplyFactory.build({ repliedTo: reply.id })
          );
          reply.replies?.push(response);
          const error = reply.validateSync();

          expect(error?.errors['replies.0']?.message).toEqual(
            'Replies topic have to the same as repliedTo'
          );
        });

        it('Is valid when have the same topic', async () => {
          const response = await ReplyModel.create(
            await ReplyFactory.build(
              { repliedTo: reply.id },
              { topicId: reply.topic }
            )
          );

          reply.replies?.push(response);

          expect(reply.validateSync()).toBeUndefined();
        });
      });
    });
  });

  describe('Adding a response', () => {
    let response: ReplyDocument;

    beforeEach(async () => {
      response = await ReplyModel.create(
        await ReplyFactory.build(
          { repliedTo: reply.id },
          { topicId: reply.topic }
        )
      );

      reply.replies?.push(response);
      await reply.save();
    });
    it('Save reply to replies list', () => {
      response.depopulate('author');
      expect(reply.replies).toContain([response]);
    });

    it("Have response' topic equal to reply", () => {
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
