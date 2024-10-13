package models

import "time"

type Color struct {
	Id        int       `json:"id,omitempty" db:"id"`
	Display   string    `json:"display" validate:"required" db:"display"`
	Hex       string    `json:"hex" validate:"required" db:"hex"`
	CreatedAt time.Time `json:"createdAt" db:"created_at"`
}
