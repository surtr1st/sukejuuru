package models

import "time"

type Node struct {
	Id        int       `json:"id,omitempty" db:"id"`
	Title     string    `json:"title" validate:"required" db:"title"`
	CreatedAt time.Time `json:"createdAt" db:"created_at"`
}
