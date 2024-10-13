package models

import "time"

type Task struct {
	Id          int       `json:"id,omitempty"`
	Title       string    `json:"title" validate:"required"`
	Description string    `json:"description"`
	MinLength   int       `json:"minLength" db:"min_length"`
	MaxLength   int       `json:"maxLength" db:"max_length"`
	StartDate   time.Time `json:"startDate" db:"start_date"`
	DueDate     time.Time `json:"dueDate" db:"due_date"`
	CreatedAt   time.Time `json:"createdAt" db:"created_at"`
	Color       string    `json:"color"`
	NodeId      int       `json:"nodeId" validate:"required" db:"node_id"`
	PriorityId  int       `json:"priorityId" db:"priority_id"`
	StatusId    int       `json:"statusId" db:"status_id"`
}
