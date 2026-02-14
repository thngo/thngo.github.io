export type FeedItemType =
  | 'career'
  | 'publication'
  | 'education'
  | 'award'
  | 'location'
  | 'milestone'
  | 'general';

export interface FeedItem {
  date: string;
  type: FeedItemType;
  title: string;
  description?: string;
  url?: string;
}

export interface AggregatedFeedItem extends FeedItem {
  profileSlug: string;
  profileName: string;
  profileAvatar?: string;
}
