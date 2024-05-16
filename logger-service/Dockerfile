# # Start from a Golang base image
FROM golang:1.22 as builder

# Set the Current Working Directory inside the container
WORKDIR /app

# Copy go mod and sum files
COPY go.mod go.sum ./

# Download all dependencies. Dependencies will be cached if the go.mod and go.sum files are not changed
RUN go mod download

# Copy the source code from the current directory to the Working Directory inside the container
COPY . .
RUN go get github.com/youmark/pkcs8@v0.0.0-20181117223130-1be2e3e5546d
RUN go get go.mongodb.org/mongo-driver/internal/aws/credentials@v1.15.0
RUN go get go.mongodb.org/mongo-driver/x/mongo/driver/ocsp@v1.15.0
RUN go get go.mongodb.org/mongo-driver/x/mongo/driver/ocsp@v1.15.0
# Build the Go app
RUN go build -o main ./cmd/api

# Start from a smaller base image
# FROM alpine:latest

# # Set the Current Working Directory inside the container
# WORKDIR /root/

# # Copy the Pre-built binary file from the previous stage
# COPY --from=builder /app/main .

EXPOSE 80
EXPOSE 5001
EXPOSE 50001
# Command to run the executable
CMD ["/app/main"]


# FROM golang:1.22

# WORKDIR /usr/src/app

# # pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
# COPY go.mod go.sum ./
# RUN go mod download && go mod verify

# COPY . .
# RUN go get github.com/youmark/pkcs8@v0.0.0-20181117223130-1be2e3e5546d
# RUN go get go.mongodb.org/mongo-driver/internal/aws/credentials@v1.15.0
# RUN go get go.mongodb.org/mongo-driver/x/mongo/driver/ocsp@v1.15.0
# RUN go get go.mongodb.org/mongo-driver/x/mongo/driver/ocsp@v1.15.0
# RUN go build -o main ./cmd/api

# CMD ["/usr/src/app/main"]