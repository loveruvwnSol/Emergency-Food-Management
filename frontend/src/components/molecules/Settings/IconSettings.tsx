import { Box, Icon, Input, Image } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { IoCameraOutline } from 'react-icons/io5';
import { useUser } from '../../../hooks/user';

const IconSettings = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [{ user, UpdateUserIcon }] = useUser(); // フックからユーザー情報とアイコン更新関数を取得
  const [previewIcon, setPreviewIcon] = useState<string | null>(user?.icon_url || null); // プレビュー用のアイコンURL

  useEffect(() => {
    if (user && user.icon_url) {
      // userが存在するか確認
      setPreviewIcon(user.icon_url); // ユーザーのアイコンURLを設定
    }
  }, [user]);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // ファイル選択ダイアログを開く
    }
  };

  const handleIconChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewIcon(reader.result as string);
      };
      reader.readAsDataURL(file);

      // ファイルが選択されたらアップロード処理を実行
      try {
        await UpdateUserIcon(file);
        // アイコンを更新した後にユーザー情報を再取得
      } catch (error) {
        console.error('アイコンのアップロードに失敗しました', error);
      }
    }
  };
  console.log(user?.icon_url, user?.name);

  return (
    <Box
      w={'100px'}
      h={'100px'}
      borderRadius={'50%'}
      position={'relative'}
      cursor={'pointer'}
      _hover={{ opacity: '50%' }}
      onClick={handleIconClick}
    >
      {previewIcon ? (
        <Image
          src={previewIcon}
          alt='User Icon'
          w={'100%'}
          h={'100%'}
          borderRadius={'50%'}
          objectFit={'cover'}
        />
      ) : (
        <Box
          w={'100px'}
          h={'100px'}
          bgColor={!previewIcon ? '#d3d3d3' : 'transparent'}
          borderRadius={'50%'}
          border={'1px solid #000'}
          position={'relative'}
          cursor={'pointer'}
          _hover={{ opacity: '50%' }}
        >
          <Icon
            as={IoCameraOutline}
            position={'absolute'}
            boxSize={'46px'}
            top={26}
            right={27.5}
          />
        </Box>
      )}
      <Input
        type='file'
        ref={fileInputRef}
        display={'none'}
        accept='image/*' // 画像ファイルのみ許可
        onChange={handleIconChange} // ファイルが選択されたときに呼ばれる
      />
    </Box>
  );
};

export default IconSettings;
