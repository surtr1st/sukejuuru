package models

import "time"

type Status struct {
	Id          int       `json:"id,omitempty" db:"id"`
	Display     string    `json:"display" validate:"required" db:"display"`
	Description string    `json:"description" db:"description"`
	CreatedAt   time.Time `json:"createdAt" db:"created_at"`
	Color       string    `json:"color" db:"color"`
}
