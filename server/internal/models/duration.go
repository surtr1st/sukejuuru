package models

import "time"

type Duration struct {
	Id          int       `json:"id,omitempty" db:"id"`
	TimeOnTask  int       `json:"timeOnTask" validate:"required" db:"time_on_task"`
	StartFrom   time.Time `json:"startFrom" validate:"required" db:"start_from"`
	EndAt       time.Time `json:"endAt" validate:"required" db:"end_at"`
	Description string    `json:"description" db:"description"`
	TaskId      int       `json:"taskId" validate:"required" db:"task_id"`
}
