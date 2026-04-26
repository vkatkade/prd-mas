# Use official lightweight Python image
FROM python:3.11-slim

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code
COPY . /app/

# Expose the port FastAPI runs on
EXPOSE 8080

# Command to run the application (Cloud Run requires binding to 0.0.0.0:8080)
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}
