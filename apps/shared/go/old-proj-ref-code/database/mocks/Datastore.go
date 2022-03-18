// Code generated by mockery v1.0.0. DO NOT EDIT.

package mocks

import database "github.com/matthew-j-welte/bit-board/server/database"
import mock "github.com/stretchr/testify/mock"

// Datastore is an autogenerated mock type for the Datastore type
type Datastore struct {
	mock.Mock
}

// GetErrorReportDB provides a mock function with given fields:
func (_m *Datastore) GetErrorReportDB() database.ErrorReportDB {
	ret := _m.Called()

	var r0 database.ErrorReportDB
	if rf, ok := ret.Get(0).(func() database.ErrorReportDB); ok {
		r0 = rf()
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(database.ErrorReportDB)
		}
	}

	return r0
}

// GetLearningDB provides a mock function with given fields:
func (_m *Datastore) GetLearningDB() database.LearningDB {
	ret := _m.Called()

	var r0 database.LearningDB
	if rf, ok := ret.Get(0).(func() database.LearningDB); ok {
		r0 = rf()
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(database.LearningDB)
		}
	}

	return r0
}

// GetLearningSuggestionDB provides a mock function with given fields:
func (_m *Datastore) GetLearningSuggestionDB() database.LearningSuggestionDB {
	ret := _m.Called()

	var r0 database.LearningSuggestionDB
	if rf, ok := ret.Get(0).(func() database.LearningSuggestionDB); ok {
		r0 = rf()
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(database.LearningSuggestionDB)
		}
	}

	return r0
}

// GetUserDB provides a mock function with given fields:
func (_m *Datastore) GetUserDB() database.UserDB {
	ret := _m.Called()

	var r0 database.UserDB
	if rf, ok := ret.Get(0).(func() database.UserDB); ok {
		r0 = rf()
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(database.UserDB)
		}
	}

	return r0
}
