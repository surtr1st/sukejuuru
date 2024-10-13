package models

import "time"

type TaskPriority struct {
	Display     string `json:"display"`
	Description string `json:"description"`
	Color       string `json:"color"`
}

type TaskStatus struct {
	Display     string `json:"display"`
	Description string `json:"description"`
	Color       string `json:"color"`
}

type TaskRelations struct {
	Id          int          `json:"id"`
	Title       string       `json:"title"`
	Description string       `json:"description"`
	MinLength   int          `json:"minLength" db:"min_length"`
	MaxLength   int          `json:"maxLength" db:"max_length"`
	StartDate   time.Time    `json:"startDate" db:"start_date"`
	DueDate     time.Time    `json:"dueDate" db:"due_date"`
	Color       string       `json:"color"`
	Priority    TaskPriority `json:"priority"`
	Status      TaskStatus   `json:"status"`
}

type TaskTag struct {
	Id    int    `json:"id"`
	Title string `json:"title"`
	Color string `json:"color"`
}

type Log struct {
	Id          int       `json:"id"`
	TaskTag     TaskTag   `json:"taskTag"`
	Description string    `json:"description"`
	TimeOnTask  int       `json:"timeOnTask" db:"time_on_task"`
	StartFrom   time.Time `json:"startFrom" db:"start_from"`
	EndAt       time.Time `json:"endAt" db:"end_at"`
}

type TrackerLog struct {
	DurationId int       `json:"durationId" db:"duration_id"`
	MadeOn     time.Time `json:"madeOn" db:"made_on"`
}
