package validations

func ItemError(err error) string {
	errorMessages := map[string]string{
		"Key: 'NewItemRequest.Name' Error:Field validation for 'Name' failed on the 'required' tag":             "アイテム名は必須です。",
		"Key: 'NewItemRequest.Name' Error:Field validation for 'Name' failed on the 'max' tag":                  "アイテム名は16文字以内で入力してください。",
		"Key: 'NewItemRequest.Type' Error:Field validation for 'Type' failed on the 'required' tag":             "タイプは必須です。",
		"Key: 'NewItemRequest.Expiration' Error:Field validation for 'Expiration' failed on the 'required' tag": "消費期限は必須です。",
		"Key: 'NewItemRequest.Stock' Error:Field validation for 'Stock' failed on the 'gte' tag":                "ストックは1日分未満にはできません。",
		"Key: 'NewItemRequest.ImageURL' Error:Field validation for 'ImageURL' failed on the 'required' tag":     "画像は必須です。",
		"Key: 'NewItemRequest.ImageURL' Error:Field validation for 'ImageURL' failed on the 'url' tag":          "無効な画像です。",
	}

	if message, exists := errorMessages[err.Error()]; exists {
		return message
	}

	return "アイテム作成に失敗しました。"
}
