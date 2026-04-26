import os
import json
import redis
from google.cloud import firestore

# Initialize Redis Client (assuming local default or use environment variable)
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))

# Fallback to a mock dictionary if Redis isn't running locally to prevent hard crashes during dev
_MOCK_REDIS = {}

class RedisManager:
    def __init__(self):
        try:
            self.client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, decode_responses=True, socket_connect_timeout=2)
            self.client.ping()
            self.use_mock = False
        except redis.ConnectionError:
            print("Warning: Redis not found at localhost:6379. Using mock in-memory state for development.")
            self.use_mock = True

    def set_session_state(self, session_id: str, state_dict: dict):
        if self.use_mock:
            _MOCK_REDIS[session_id] = json.dumps(state_dict)
        else:
            self.client.set(f"session:{session_id}", json.dumps(state_dict))

    def get_session_state(self, session_id: str):
        if self.use_mock:
            data = _MOCK_REDIS.get(session_id)
        else:
            data = self.client.get(f"session:{session_id}")
        return json.loads(data) if data else None

redis_db = RedisManager()

# Initialize Firestore Client
# In a real setup, this uses default credentials. We will wrap in a try-except for local dev.
try:
    firestore_db = firestore.Client()
except Exception as e:
    print(f"Warning: Could not initialize Firestore Client: {e}. Artifacts won't be persistently saved.")
    firestore_db = None
