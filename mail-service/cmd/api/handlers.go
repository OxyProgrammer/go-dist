package main

import "net/http"

func (app *Config) SendMail(w http.ResponseWriter, r *http.Request) {
	// var requestPayload RequestPayload
	// err := app.readJSON(w, r, &requestPayload)
	// if err != nil {
	// 	app.errorJSON(w, err)
	// 	return
	// }

	// switch requestPayload.Action {
	// case "auth":
	// 	app.authenticate(w, requestPayload.Auth)
	// case "log":
	// 	app.logItem(w, requestPayload.Log)
	// default:
	// 	app.errorJSON(w, errors.New("unknown action"))
	// }
}
