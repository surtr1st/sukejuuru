package utils

type StringOrSlice[T any] interface {
	~string | []T
}

func IsEmpty[T StringOrSlice[T]](target T) bool {
	switch value := any(target).(type) {
	case []T:
		return len(value) == 0
	default:
		return value == ""
	}
}
