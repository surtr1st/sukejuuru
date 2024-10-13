package models

import "time"

type Tracker struct {
	MadeOnDate time.Time `json:"madeOnDate" validate:"required"`
	DurationId int       `json:"durationId" validate:"required"`
}
