package main

import (
	"fmt"
	event "listener/events"
	"log"
	"math"
	"os"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

func main() {

	//try to connect to rabbit mq
	rabbitConn, err := connect()
	if err != nil {
		log.Println(err)
		os.Exit(1)
	}
	defer rabbitConn.Close()

	//start listening to messages
	log.Println("Listening for and consuming RabbitMQ")

	// create consumer
	consumer, err := event.NewConsumer(rabbitConn)
	if err != nil {
		panic(err)
	}

	// watch the queue and consume events
	err = consumer.Listen([]string{"log.INFO", "log.WARNING", "log.ERROR"})
	if err != nil {
		log.Println(err)
	}
}

func connect() (*amqp.Connection, error) {
	var count int64
	var backOffInterval = 1 * time.Second
	var connection *amqp.Connection
	for {
		c, err := amqp.Dial("amqp://guest:guest@rabbitmq")
		if err != nil {
			fmt.Println("RabbitMQ is not ready...")
			count++
		} else {
			log.Println("Connected to RabbitMQ")
			connection = c
			break
		}
		if count > 5 {
			fmt.Println(err)
			return nil, err
		}

		backOffInterval = time.Duration(math.Pow(float64(count), 2)) * time.Second
		log.Println("Backing off...")
		time.Sleep(backOffInterval)
		continue
	}
	return connection, nil
}
