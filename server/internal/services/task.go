package services

import (
	"fmt"
	success "sukejuuru/internal/enums"
	"sukejuuru/internal/models"
	"sukejuuru/internal/utils"

	"github.com/jmoiron/sqlx"
)

type taskService struct {
	db *sqlx.DB
}

func UseTask() *taskService {
	return &taskService{db: utils.UsePostgres()}
}

func (service taskService) FindAllByNode(nodeId int) ([]models.TaskRelations, error) {
	var tasks []models.TaskRelations
	query := `
		SELECT t.id, t.title, t.description, t.min_length, t.max_length, t.start_date, t.due_date, t.color,
			p.display, p.description, p.color,
			s.display, s.description, s.color
		FROM task t
		JOIN priority p ON t.priority_id = p.id
		JOIN status s on t.status_id = s.id
		WHERE t.node_id = $1
	`
	if err := service.db.Select(&tasks, query, nodeId); err != nil {
		return nil, err
	}
	return tasks, nil
}

func (service taskService) Create(values models.Task) (string, error) {
	query := `
		INSERT INTO task (title, description, min_length, max_length, start_date, due_date, created_at, color, node_id, priority_id, status_id)
		VALUES (:title, :description, :min_length, :max_length, :start_date, :due_date, :created_at, :color, :node_id, :priority_id, :status_id)
	`
	if _, err := service.db.NamedExec(query, values); err != nil {
		return "", err
	}
	return success.CREATED, nil
}

func (service taskService) Patch(id int, target string, value any) (string, error) {
	query := fmt.Sprintf(`
		UPDATE TABLE task 
		SET %s = $1
		WHERE id = $2
	`, target)
	if _, err := service.db.Exec(query, value, id); err != nil {
		return "", err
	}
	return success.UPDATED, nil
}

func (service taskService) Delete(id int) (string, error) {
	query := "DELETE TABLE task WHERE id = $1"
	if _, err := service.db.Exec(query, id); err != nil {
		return "", err
	}
	return success.DELETED, nil
}
