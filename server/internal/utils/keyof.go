package utils

import (
	"errors"
	"reflect"
)

func UseKeyof(target any, key string) (string, error) {
	val := reflect.ValueOf(target)
	if val.Kind() == reflect.Struct {
		for i := 0; i < val.NumField(); i++ {
			fieldName := val.Type().Field(i).Name
			if fieldName == key {
				return fieldName, nil
			}
		}
	}
	return "", errors.New("selected key isn't available")
}
