import { CategoryDocument, TopicDocument, ReplyDocument } from '@/topics';
import { UserDocument } from '@/users';

const TopicResolver = {
  Topic: {
    async numReplies(topic: TopicDocument): Promise<number> {
      await topic.populate('numReplies').execPopulate();
      return topic.numReplies;
    },

    async participants(topic: TopicDocument): Promise<UserDocument[]> {
      return topic.participants.exec();
    },

    async replies(topic: TopicDocument): Promise<ReplyDocument[]> {
      await topic.populate('replies').execPopulate();
      return topic.replies ?? [];
    },

    async category(
      topic: TopicDocument
    ): Promise<CategoryDocument | undefined> {
      await topic.populate('category').execPopulate();
      return topic.category;
    },
  },
};

export default TopicResolver;
