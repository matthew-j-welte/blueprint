package users

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// CodeEditorConfiguration a saved code editor configuration
type CodeEditorConfiguration struct {
	ID             primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name           string             `json:"configurationName"`
	FontSize       int
	TabSize        int
	ColorTheme     string
	ColorThemeURL  string `json:"colorThemeUrl"`
	HasGutter      bool
	HasLineNumbers bool
	HighlightLine  bool
	EditorHeight   string
}
