package middleware_test

import (
	"errors"
	"testing"

	"github.com/matthew-j-welte/bit-board/server/middleware"
	"github.com/stretchr/testify/suite"
)

type UserMiddlewareSuite struct {
	suite.Suite
	helper MockMiddlewareHelper
}

func (suite *UserMiddlewareSuite) SetupTest() {
	suite.helper = MockMiddlewareHelper{}
	suite.helper.Setup()
}

func (suite *UserMiddlewareSuite) TestGetUserCount() {
	suite.helper.AddUserDBMockFunc("CountUsers", 0, int64(1), nil)
	suite.helper.AddHttpWriterMockFunc("Write", 1, 1, nil)
	passed := middleware.GetUserCount(
		&suite.helper.MockDatastore,
		suite.helper.MockResponseWriter,
		suite.helper.MockRequest,
	)
	suite.True(passed)
}

func (suite *UserMiddlewareSuite) TestGetUserCountFailure() {
	suite.helper.AddUserDBMockFunc("CountUsers", 0, int64(0), errors.New("err"))
	suite.helper.AddHttpWriterMockFunc("Write", 1, 1, nil)
	passed := middleware.GetUserCount(
		&suite.helper.MockDatastore,
		suite.helper.MockResponseWriter,
		suite.helper.MockRequest,
	)
	suite.False(passed)
}

func TestUserMiddlewareSuite(t *testing.T) {
	suite.Run(t, new(UserMiddlewareSuite))
}
