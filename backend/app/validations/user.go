package validations

func UpdateUsernameError(err error) string {
	errorMessages := map[string]string{
		"Key: 'UpdateUsernameRequest.Name' Error:Field validation for 'Name' failed on the 'required' tag": "名前は必須です。",
		"Key: 'UpdateUsernameRequest.Name' Error:Field validation for 'Name' failed on the 'max' tag":      "名前は16文字以内で入力してください。",
	}

	if message, exists := errorMessages[err.Error()]; exists {
		return message
	}

	return "名前の更新に失敗しました。"
}

func UpdateUserIconError(err error) string {
	errorMessages := map[string]string{
		"Key: 'IconURL' Error:Field validation for 'IconURL' failed on the 'required' tag": "画像は必須です。",
		"Key: 'IconURL' Error:Field validation for 'IconURL' failed on the 'url' tag":      "無効な画像です。",
	}

	if message, exists := errorMessages[err.Error()]; exists {
		return message
	}

	return "アイコンの更新に失敗しました。"
}
