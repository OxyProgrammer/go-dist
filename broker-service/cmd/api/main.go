package main

import (
	"fmt"
	"log"
	"math"
	"net/http"
	"os"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

const webPort = "80"

type Config struct {
	Rabbit *amqp.Connection
}

func main() {
	//try to connect to rabbit mq
	rabbitConn, err := connect()
	if err != nil {
		log.Println(err)
		os.Exit(1)
	}
	defer rabbitConn.Close()

	app := Config{
		Rabbit: rabbitConn,
	}

	log.Printf("Starting broker service on port %s\n", webPort)

	//define http server

	srv := &http.Server{
		Addr:    fmt.Sprintf(":%s", webPort),
		Handler: app.routes(),
	}

	//Start the server
	err = srv.ListenAndServe()
	if err != nil {
		log.Panic(err)
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
