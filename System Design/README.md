# System Design Study Recap

This document consolidates everything studied across six buckets of system design. Each bucket answers a specific question about how large-scale systems work, and together they trace the complete journey of a request from a client through to a response.

The mental model: every bucket revisits the same request, examined at increasing depth — networking first, then APIs, then data, then scale, then failure, then long-term architecture.

---

## Interview Framework

**7-Step Approach for any design question:**
1. Clarify the problem
2. Define scale
3. Define APIs
4. High-level design
5. Deep dive
6. Bottlenecks & tradeoffs
7. Reliability & wrap-up

**Opening questions to always ask:**
- Who are the users?
- What core features must exist? What is NOT required initially?
- Expected scale — users, QPS?
- Latency expectations?
- Read vs write ratio?
- Real-time or eventual consistency?
- Data persistence requirements?
- Global or regional system?
- Which area should we prioritize designing deeply?

---

## Bucket 1 — Foundations (How requests move)

**Core question:** How does a request even reach my system, and where does latency come from before my code runs?

This bucket is about networking and request flow — not scaling yet. It establishes the baseline path every request takes before touching any application logic.

**Concepts studied:**

- **Client-Server Architecture** — Clients handle UI; servers own business logic and data. Centralization enables security, consistency, and controlled scalability.
- **IP Addresses & Ports** — IPs identify machines on the network. Ports identify services running on those machines (e.g., port 443 for HTTPS, port 5432 for PostgreSQL).
- **DNS** — A distributed, hierarchical, cached system that translates human-readable domain names into IP addresses. Clients cache DNS results to avoid repeated lookups.
- **HTTP vs HTTPS & TLS** — HTTP is plaintext. HTTPS wraps HTTP in TLS, which provides encryption in transit and server identity verification via certificates. TLS handshake adds latency on first connection.
- **Forward Proxy vs Reverse Proxy** — A forward proxy sits in front of clients and represents them (e.g., for privacy or filtering). A reverse proxy sits in front of servers and represents them (e.g., for load balancing, TLS termination, caching).
- **Latency** — The time for a full round-trip. Latency accumulates across each step: DNS lookup, network travel, TLS handshake, reverse proxy routing, application processing, and database query. Reducing any of these reduces total latency.

**End-to-end flow:**
```
Client → DNS lookup → IP resolved → HTTPS request →
Reverse proxy (TLS termination) → Application server →
Database → Response back to client
```

---

## Bucket 2 — APIs (How clients talk to backend)

**Core question:** What does the client actually call, and how do we design safe, predictable interfaces?

This bucket is about contracts — not infrastructure. An API defines what operations exist, what inputs are expected, and what responses look like.

**Concepts studied:**

- **APIs** — A contract between client and server. Defines how to request data or trigger actions without exposing internal implementation.
- **REST APIs** — Resource-oriented design using HTTP. Resources are nouns (e.g., `/users`, `/orders`), and HTTP methods define the action. Stateless — every request carries all the context the server needs; no client session is stored on the server.
- **HTTP Methods & CRUD semantics:**
  - `GET` — Read a resource. Safe and idempotent.
  - `POST` — Create a resource. Not idempotent (calling it twice creates two things).
  - `PUT` — Replace a resource entirely. Idempotent.
  - `PATCH` — Partially update a resource.
  - `DELETE` — Remove a resource. Idempotent.
- **HTTP Status Codes:**
  - `200 OK`, `201 Created`, `202 Accepted`, `204 No Content`
  - `301 Redirect`, `304 Not Modified`
  - `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`
  - `409 Conflict`, `422 Unprocessable Entity`, `429 Too Many Requests`
  - `500 Internal Server Error`, `502 Bad Gateway`, `503 Service Unavailable`, `504 Gateway Timeout`
- **Idempotency** — An operation is idempotent if calling it multiple times produces the same server state as calling it once. Critical for safe retries (e.g., payment processing).

**Request flow through the API layer:**
```
Router → Controller → Validation → Service layer →
Database → Response with status code
```

---

## Bucket 3 — Data Layer (Where data lives)

**Core question:** Where does data live, how is it modeled, and how does it scale?

This bucket is where most system design depth lives. Storage decisions have the largest long-term impact on scalability, consistency, and cost.

**Concepts studied:**

- **Databases** — Centralized, durable systems that manage concurrent access safely. They handle reads, writes, transactions, and failure recovery.
- **SQL vs NoSQL:**
  - SQL (relational) — Tables with schemas, ACID transactions, strong consistency. Best for payments, orders, user accounts — anything requiring correctness guarantees.
  - NoSQL — Flexible schema, BASE properties (Basically Available, Soft state, Eventually consistent). Best for feeds, logs, catalogs, session data — anything requiring high throughput at scale.
  - Real-world systems typically use both: SQL for critical transactional data, NoSQL for high-volume distributed workloads.
- **Indexing** — B-tree structures that speed up reads by trading write performance and storage. Index high-selectivity columns (e.g., `user_id`, `email`). Composite indexes follow the leftmost prefix rule — a composite index on `(a, b, c)` supports queries filtering on `a`, `a+b`, or `a+b+c`, but not on `b` alone.
- **Replication** — Multiple copies of data across machines for availability and read scalability. Primary handles writes; replicas serve reads. Sync replication: guarantees consistency but adds write latency. Async replication: faster writes but introduces replication lag and eventual consistency. Changes propagated via WAL (Postgres) or binlog (MySQL).
- **Horizontal Partitioning (Sharding)** — Splitting rows across multiple database nodes by a shard key. Strategies: range-based, hash-based, consistent hashing (minimizes resharding impact), geo-based. Enables horizontal write scaling. Hot key problem: one shard overwhelmed — mitigated by caching, compound keys, or sub-sharding.
- **Vertical Partitioning** — Splitting a table by columns rather than rows. Separates hot columns (frequently accessed) from cold columns (rarely accessed), reducing row size and improving cache efficiency.
- **Denormalization** — Intentionally duplicating data across tables to optimize read performance at the cost of write amplification. Updates must propagate to all copies — typically done via event-driven eventual consistency.
- **Blob Storage** — Large binary objects (images, videos, files) belong in object storage (S3, Google Cloud Storage), not in the database. The database stores only metadata and the URL. Content delivered via CDN.

---

## Bucket 4 — Performance & Scale (Handling growth)

**Core question:** What happens when traffic grows, and what breaks first?

Scaling comes after you understand data and APIs. This bucket covers the infrastructure layer that absorbs traffic growth.

**Concepts studied:**

- **Vertical Scaling (Scale Up)** — Adding more resources to a single machine (CPU, RAM, SSD, network). Simple, no code changes needed. Hard limit: the largest machine available. Single point of failure.
- **Horizontal Scaling (Scale Out)** — Running multiple stateless instances behind a load balancer. Fault tolerant and theoretically unlimited. Requires stateless application design — session state must live externally (e.g., Redis), not in-process.
- **Load Balancers** — A reverse proxy distributing incoming traffic across application instances. Performs TLS termination and health checks. Algorithms: round robin, least connections, weighted routing, hash-based (for sticky routing). L4 load balancers route by IP/TCP; L7 load balancers route by HTTP headers, paths, or content. Load balancers themselves scale horizontally.
- **Caching** — Storing computed results in fast in-memory storage (Redis, Memcached) to avoid repeated expensive operations. Cache-aside pattern: check cache first → on miss, query DB → store result in cache with TTL → future requests hit cache. Types: entity cache (full objects by ID), query cache (result sets), aggregation cache (computed counts/rankings). Problems: stale data (mitigated by TTL or delete-on-write), cache stampede (mitigated by locking or jitter on TTL), hot keys (mitigated by local in-process cache or key spreading).
- **CDN (Content Delivery Network)** — Globally distributed edge servers that cache and serve static or cacheable content close to users. On a cache hit, content is served at the edge with minimal latency. On a miss, the request is forwarded to the origin, and the response is cached at the edge for future requests. Reduces geographic latency and origin load. Examples: Cloudflare, AWS CloudFront, Akamai, Fastly, Google Cloud CDN.

---

## Bucket 5 — Distributed Systems & Reliability (Surviving failure)

**Core question:** What happens when things fail, and how do we survive spikes and partial outages?

This bucket is about failure, not features. Distributed systems fail constantly — the design must account for it from the start.

**Concepts studied:**

- **CAP Theorem** — In a distributed system, during a network partition, you must choose between Consistency (every read returns the latest write) and Availability (every request receives a response, possibly stale). Partition tolerance is not optional — networks fail. Most large-scale systems choose AP (Availability + Partition tolerance) and accept eventual consistency. Examples: Amazon shopping cart (AP — availability prioritized), Bloomberg trading (CP — consistency critical), Netflix viewing progress (AP — stale data acceptable).
- **Message Queues** — Decouple producers from consumers. Producers publish events; consumers process them independently and asynchronously. Absorbs traffic spikes — producers don't block waiting for consumers. At-least-once delivery: messages may be delivered more than once, so consumers must be idempotent. Failed messages go to a dead-letter queue for inspection. Examples: RabbitMQ, Amazon SQS, Kafka, Google Pub/Sub.
- **Containers & Kubernetes** — Docker packages an application and its dependencies into a portable container. Kubernetes orchestrates containers across a cluster: scheduling, health checks, auto-scaling, and rolling deployments. CPU limits cause throttling (process slowed but not killed) rather than OOM kills. Queue backlog grows when consumers are throttled.
- **Monolith vs Microservices** — A monolith deploys everything as a single unit: simple to develop, test, and deploy initially. Microservices decompose the system into independently deployable services, each owning its data. Enables independent scaling, fault isolation, and separate deployment cycles. The standard path: start monolith, extract services when scaling pain demands it. Services communicate synchronously (REST, gRPC) or asynchronously (message queues).
- **Rate Limiting** — Controls how many requests a client can make in a window. Protects system stability and prevents abuse. Algorithms: token bucket (smooth bursty traffic), leaky bucket (strict output rate), fixed window (simple, vulnerable to boundary bursts), sliding window (accurate, higher overhead). Enforced at edge or gateway, coordinated across instances via Redis. Returns HTTP 429 when limit exceeded.

---

## Bucket 6 — System Architecture Patterns (Long-term structure)

**Core question:** How do we structure large systems over time, and what patterns handle complex integration needs?

These patterns are architectural choices built on everything above. They address real-time communication, event-driven integration, and large-scale service organization.

**Concepts studied:**

- **WebSockets** — Persistent, full-duplex TCP connections initiated via an HTTP upgrade handshake. The server can push data to the client without the client polling. Heartbeat mechanism (ping/pong) keeps connections alive. Stateful by nature — a client is pinned to a specific server instance. Scaled via pub/sub (Redis, Kafka) so any server can receive a message and push to the connected client. Durability: messages stored in DB or queue to handle reconnects. Real-world: WhatsApp, Slack, Bloomberg Terminal, Uber driver tracking, Google Docs collaborative editing.
- **Webhooks** — Event-driven HTTP callbacks. When an event occurs in a provider system, it sends an HTTP POST to a URL registered by the consumer. Eliminates polling — the consumer doesn't need to continuously ask "did anything happen?". Reliability via retries with exponential backoff. Consumers must be idempotent (use idempotency keys) because retries can cause duplicate deliveries. Signature verification (HMAC) confirms the payload came from a legitimate sender. Examples: Stripe payment events, GitHub push events, Shopify order notifications.
- **Microservices (architectural perspective)** — Services are aligned to business domains, each independently deployable and scalable. Each service owns its database — no shared data stores between services. Services communicate synchronously via REST or gRPC for request-response flows, and asynchronously via queues for event-driven flows. Kubernetes orchestrates service instances with health management and horizontal scaling per service. Enables fault isolation — one service failing does not cascade if properly bounded.
- **API Gateway** — A single entry point for all client traffic into a microservices backend. Handles: authentication and authorization (JWT, OAuth), rate limiting, request routing to the correct downstream service, API versioning, logging, and observability. Also routes WebSocket connections and webhook endpoints. Horizontally scaled, with Kubernetes service discovery for routing. Eliminates the need for clients to know individual service addresses.

---

## Full Request Journey (All 6 Buckets)

This is the end-to-end narrative stitching all buckets together:

1. A client app makes a request. DNS resolves the domain to an IP, pointing to a CDN or edge layer.
2. If the content is static and cached at the edge, it is served immediately. Otherwise, the request is forwarded to the origin.
3. At the edge, rate limiting, WAF filtering, and authentication checks protect downstream services from abuse and overload.
4. The request reaches a load balancer, which terminates TLS and distributes traffic across horizontally scaled application instances running in containers orchestrated by Kubernetes.
5. Inside the application layer, an API Gateway routes the request to the correct service. The controller authenticates, validates, and passes to the service layer for business logic.
6. Before hitting the database, the service checks Redis (cache-aside pattern). On a cache hit, the response is returned immediately. On a miss, the database is queried and the result is stored in cache.
7. The data layer combines SQL (strongly consistent transactional data) and NoSQL (high-throughput distributed workloads). Replication and sharding scale reads and writes.
8. For long-running or high-volume operations, services publish events to a message queue. Background workers process tasks asynchronously with retries and idempotent handling.
9. Because distributed systems must tolerate network failures, many platforms prioritize availability (AP) and propagate changes eventually rather than requiring synchronous consistency everywhere.
10. The response flows back through the API Gateway, load balancer, and CDN (which may cache it at the edge for future requests).

**Together:** CDN + caching reduce latency. Load balancing + horizontal scaling handle traffic growth. Message queues + async processing absorb spikes. Rate limiting + WAF protect stability. Kubernetes + containers enable reliable deployment. Replication + sharding scale the data layer. All of it fails gracefully because each layer degrades independently rather than cascading.
