import type { LiteralUnion } from 'type-fest';

export type TopicComponent = string;

export type SubscribeTopicComponent = LiteralUnion<'*', string>;

export type TopicDescriptor =
  `${TopicComponent}.${TopicComponent}.${TopicComponent}.${TopicComponent}`;

export type SubscribeTopicDescriptor =
  | `${SubscribeTopicComponent}.${SubscribeTopicComponent}.${SubscribeTopicComponent}.${SubscribeTopicComponent}`
  | '*';

/**
 * A common base interface for any event data
 *
 * @export
 * @interface EventData
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventData = Record<string, any>;

/**
 * Subscription issued to subscriber
 *
 * @export
 * @interface Subscription
 */
export interface Subscription {
  topic: SubscribeTopicDescriptor;
  cancel: () => void;
}

/**
 * Aggregates event collection
 *
 * Responsibilities:
 * - manages event collection
 * - allows to register event and issues EventPublisher to user that registered event
 */
export interface EventRegistrar {
  /**
   * Registers event by topic and event data type, validates topic correctness and uniqueness
   *
   * @returns {EventPublisher} event publisher
   * @memberof EventRegistrar
   */
  register: <T extends EventData>(topic: TopicDescriptor) => EventPublisher<T>;
  /**
   * Returns all available topics
   *
   * @memberof EventRegistrar
   */
  getAllTopics: () => TopicDescriptor[];
}

/**
 * Aggregate that admits event publishing
 *
 * Responsibilities:
 * - routes published data by topic
 *
 */
export interface EventPublisher<T extends EventData> {
  /**
   * Publishes event synchronously.
   *
   * @returns {boolean} whether there is at least one subscriber
   * @memberof EventPublisher
   */
  publishSync: (data: T) => boolean;
  /**
   * Publishes event asynchronously.
   *
   * @returns {boolean} whether there is at least one subscriber
   * @memberof EventPublisher
   */
  publish: (data: T) => boolean;
  /**
   * Publishes event asynchronously once, then disposes itself (if there was at least one subscriber)
   *
   * @memberof EventPublisher
   */
  publishOnce: (data: T) => boolean;
  /**
   * Topic of the publisher
   *
   * @type {Topic}
   * @memberof EventPublisher
   */
  topic: TopicDescriptor;
}

/**
 * Aggregate that admits event subscription
 *
 * Responsibilities:
 * - subscribes event handlers
 * - issues Subscription to user
 *
 * @export
 * @interface EventSubscriptor
 */
export interface EventSubscriptor {
  /**
   * Subscribes handler to event
   *
   * @memberof EventSubscriptor
   */
  subscribe: (
    topic: SubscribeTopicDescriptor,
    handler: (topic: TopicDescriptor, data: EventData) => void,
    id: string
  ) => Subscription;
}

export interface RicosEventTarget {
  addEventListener: (
    type: SubscribeTopicDescriptor,
    listener: (topic: TopicDescriptor, data: EventData) => void
  ) => void;
  removeEventListener: (
    type: SubscribeTopicDescriptor,
    listener: (topic: TopicDescriptor, data: EventData) => void
  ) => void;
}
