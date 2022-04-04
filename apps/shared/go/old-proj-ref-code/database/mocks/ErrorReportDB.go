// Code generated by mockery v1.0.0. DO NOT EDIT.

package mocks

import mock "github.com/stretchr/testify/mock"
import reports "github.com/matthew-j-welte/bit-board/server/models/reports"

// ErrorReportDB is an autogenerated mock type for the ErrorReportDB type
type ErrorReportDB struct {
	mock.Mock
}

// Create provides a mock function with given fields: report
func (_m *ErrorReportDB) Create(report reports.ErrorReport) (string, error) {
	ret := _m.Called(report)

	var r0 string
	if rf, ok := ret.Get(0).(func(reports.ErrorReport) string); ok {
		r0 = rf(report)
	} else {
		r0 = ret.Get(0).(string)
	}

	var r1 error
	if rf, ok := ret.Get(1).(func(reports.ErrorReport) error); ok {
		r1 = rf(report)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}