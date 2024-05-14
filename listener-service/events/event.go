package event

import (
	amqp "github.com/rabbitmq/amqp091-go"
)

func declareExchange(channel *amqp.Channel) error {
	return channel.ExchangeDeclare(
		"logs_topic", //name
		"topic",      //type
		true,         //durable
		false,        //auto deleted
		false,        //internal
		false,        //np-wait
		nil,          //arguements
	)
}

func declareQueue(channel *amqp.Channel) (amqp.Queue, error) {
	return channel.QueueDeclare(
		"",    //name
		false, //durable
		false, //delete when unused
		true,  //exclusive
		false, //no-wait
		nil,   //aurguments
	)
}
