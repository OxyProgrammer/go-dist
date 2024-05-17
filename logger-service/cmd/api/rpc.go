package main

import (
	"context"
	"log"
	"log-service/data"
	"time"
)

type RPCServer struct {
}

type RPCPayload struct {
	Name string
	Data string
}

func (r *RPCServer) GetAllLogsList(dummyArg string, res *[]data.LogEntry) error {
	log.Println("GetLogsList called via RPC in Logger Service!")
	logEntry := data.LogEntry{}
	logPointers, err := logEntry.All()
	if err != nil {
		log.Println("Error ocurred while getting all logs: ", err)
		return err
	}

	var logs = make([]data.LogEntry, len(logPointers))
	for i, ptr := range logPointers {
		logs[i] = *ptr
	}

	*res = logs
	return nil
}

func (r *RPCServer) DeleteAllLogs(dummyArg string, res *string) error {
	log.Println("DeleteAllLogs called via RPC in Logger Service!")
	logEntry := data.LogEntry{}
	err := logEntry.DropCollection()
	if err != nil {
		log.Println("Error ocurred while dropping collection of all logs: ", err)
		return err
	}

	*res = "Successfully dropped the collection of all logs"
	return nil
}

// The following method wont be used anymore. Its for historical reasons
func (r *RPCServer) LogInfo(payload RPCPayload, resp *string) error {
	collection := client.Database("logs").Collection("logs")
	_, err := collection.InsertOne(context.TODO(), data.LogEntry{
		Name:      payload.Name,
		Data:      payload.Data,
		CreatedAt: time.Now(),
	})
	if err != nil {
		log.Println("error writing to mongo", err)
		return err
	}

	*resp = "Processed payload via RPC:" + payload.Name
	return nil
}
