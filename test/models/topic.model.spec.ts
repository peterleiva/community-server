import { TopicDocument, TopicModel } from 'src/topics';
import { ReplyDocument } from 'src/topics';
import TopicFactory from 'test/factories/topic';
import ReplyFactory from 'test/factories/reply';
import databaseSetup from 'test/utils/database';
import ReplyModel from 'src/topics/reply.model';
import { random } from 'faker';

describe('Topic', () => {
  let topic: TopicDocument;

  databaseSetup();

  beforeEach(async () => {
    topic = await TopicModel.create(await TopicFactory.build());
  });

  describe('Methods', () => {
    let replies$: Promise<ReplyDocument[]>;

    beforeEach(async () => {
      replies$ = ReplyModel.create(
        await Promise.all(ReplyFactory.buildList(3))
      );
    });

    describe('.replies', () => {
      it('Get empty when theres no reply', async () => {
        await topic.populate('replies').execPopulate();
        expect(topic.replies).toBeEmpty();
      });

      it('Get direct topic replies', async () => {
        const replies = await replies$;

        await ReplyModel.create(
          await ReplyFactory.build({
            topic: topic._id,
            repliedTo: replies[0]._id,
          })
        );

        await topic.populate('replies').execPopulate();

        expect(topic.replies).toEqual(
          expect.arrayContaining(
            replies.map((r) => expect.objectContaining({ _id: r._id }))
          )
        );
      });
    });
    describe('.numReplies', () => {
      it("Gets 0 when there's no reply", async () => {
        await topic.populate('numReplies').execPopulate();

        expect(topic.numReplies).toBe(0);
      });

      it('Return direct all replies direct or not', async () => {
        const replies = await replies$;

        // creates a list of response to the first reply
        const response = await ReplyModel.create(
          await Promise.all(
            ReplyFactory.buildList(3, {
              topic: topic._id,
              repliedTo: replies[random.number(3)]._id,
            })
          )
        );

        await topic.populate('numReplies').execPopulate();
        expect(topic.numReplies).toBe(replies.length + response.length);
      });
    });
  });

  describe('.participants', () => {
    let replies$: Promise<ReplyDocument[]>;

    beforeEach(async () => {
      replies$ = ReplyModel.create(
        await Promise.all(ReplyFactory.buildList(3, { topic: topic._id }))
      );
    });

    it.only('Get all participants', async () => {
      await replies$;

      const top = await topic
        .populate({
          path: 'participants',
          model: 'Reply',
        })
        .execPopulate();

      console.log('parts', top.participants);
    });
  });
});
