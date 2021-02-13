import { random } from 'faker';
import { TopicDocument, TopicModel, ReplyDocument } from '@/topics';
import ReplyModel from '@/topics/reply.model';
import TopicFactory from '../__mocks__/topic';
import ReplyFactory from '../__mocks__/reply';
import databaseSetup from 'helpers/database';

describe('Topic', () => {
  let topic: TopicDocument;

  databaseSetup();

  beforeEach(async () => {
    topic = await TopicModel.create(await TopicFactory.build());
  });

  describe('Methods', () => {
    let replies$: () => Promise<ReplyDocument[]>;

    beforeEach(() => {
      replies$ = async () =>
        await ReplyModel.create(
          await Promise.all(ReplyFactory.buildList(3, { topic: topic._id }))
        );
    });

    describe('.replies', () => {
      it('Get empty when theres no reply', async () => {
        await topic.populate('replies').execPopulate();
        expect(topic.replies).toBeEmpty();
      });

      it('Get direct topic replies', async () => {
        const replies = await replies$();

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
        const replies = await replies$();

        // creates a list of response to the first reply
        const response = await ReplyModel.create(
          await Promise.all(
            ReplyFactory.buildList(3, {
              topic: topic._id,
              repliedTo: replies[random.number(2)]._id,
            })
          )
        );

        topic = await topic.populate('numReplies').execPopulate();
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

    it('Get all participants', async () => {
      const replies = await replies$;
      const participants = await topic.participants.append({
        $project: { _id: 1 },
      });

      const repliesIds = replies.map((r) => ({ _id: r.author._id }));

      expect(repliesIds).toEqual(expect.arrayContaining(participants));
    });
  });
});
