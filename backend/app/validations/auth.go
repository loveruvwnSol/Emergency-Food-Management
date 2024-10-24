package validations

func CreateAccountError(err error) string {
	errorMessages := map[string]string{
		"Key: 'User.Name' Error:Field validation for 'Name' failed on the 'required' tag":         "名前は必須です。",
		"Key: 'User.Name' Error:Field validation for 'Name' failed on the 'max' tag":              "名前は16文字以内で入力してください。",
		"Key: 'User.Email' Error:Field validation for 'Email' failed on the 'required' tag":       "メールアドレスは必須です。",
		"Key: 'User.Password' Error:Field validation for 'Password' failed on the 'required' tag": "パスワードは必須です。",
		"Key: 'User.Password' Error:Field validation for 'Password' failed on the 'min' tag":      "パスワードは8文字以上で入力してください。",
		"Key: 'User.Email' Error:Field validation for 'Email' failed on the 'email' tag":          "無効なメールアドレスです。",
	}

	if message, exists := errorMessages[err.Error()]; exists {
		return message
	}

	return "アカウント作成に失敗しました。"
}
