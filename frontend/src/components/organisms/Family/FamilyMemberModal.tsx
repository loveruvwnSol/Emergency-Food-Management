import { Box, Icon, Modal, ModalBody, ModalContent, ModalOverlay, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import OtherFamilyMembers from './OtherFamilyMembers';
import InviteFamilyBtn from '../../atoms/InviteFamilyBtn';

type FamilyMemberModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

const FamilyMemberModal: React.FC<FamilyMemberModalProps> = ({ onClose, isOpen }) => {
  const [familyNumber, setFamilyNumber] = useState(4);

  const Members = [
    { Name: 'jason', food: 3, drink: 3 },
    { Name: 'jason', food: 3, drink: 3 },
    { Name: 'jason', food: 3, drink: 3 },
    { Name: 'jason', food: 3, drink: 3 },
    { Name: 'jason', food: 3, drink: 3 },
    { Name: 'jason', food: 3, drink: 3 },
    { Name: 'jason', food: 3, drink: 3 },
    { Name: 'jason', food: 3, drink: 3 },
  ];

  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          maxW={'1000px'}
          h={'600px'}
        >
          <ModalBody position={'relative'}>
            <Box
              width={'100%'}
              height={'100%'}
              overflowY={'auto'}
              maxH={'580px'}
              m={'0 auto'}
              pl={10}
            >
              <Box pt={10}>
                <Text
                  fontSize={'24px'}
                  fontWeight={'bold'}
                >
                  家族一覧({familyNumber})
                </Text>

                <Box //利用者のプロフィール
                  display={'flex'}
                  justifyContent={'start'}
                  alignItems={'center'}
                  mb={2}
                  mt={16}
                  w={'800px'}
                  h={'60px'}
                >
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    w={'80%'}
                    gap={50}
                  >
                    <Box
                      display={'flex'}
                      alignItems={'center'}
                      gap={8}
                    >
                      <Box //アイコン
                        w={'60px'}
                        h={'60px'}
                        borderRadius={50}
                        border={'1px solid'}
                        position={'relative'}
                      >
                        <Text
                          color={'#FB8B24'}
                          fontSize={'11px'}
                          position={'absolute'}
                          top={-4}
                          right={3}
                          fontWeight={'bold'}
                        >
                          あなた
                        </Text>
                      </Box>
                      <Text
                        fontSize={'20px'}
                        fontWeight={'bold'}
                      >
                        benjy
                      </Text>
                    </Box>
                    <Box
                      display={'flex'}
                      gap={3}
                    >
                      <Box
                        display={'flex'}
                        alignItems={'center'}
                      >
                        <Text
                          color={'#000000'}
                          fontSize={'12px'}
                          fontWeight={'medium'}
                          opacity={'50%'}
                        >
                          目標備蓄数
                        </Text>
                        <Icon
                          as={IoIosArrowForward}
                          color={'#000000'}
                          opacity={'50%'}
                        />
                      </Box>
                      <Box>
                        <Text
                          color={'#000000'}
                          fontSize={'12px'}
                          fontWeight={'medium'}
                          opacity={'50%'}
                        >
                          食料3日分
                        </Text>
                        <Text
                          color={'#000000'}
                          fontSize={'12px'}
                          fontWeight={'medium'}
                          opacity={'50%'}
                        >
                          飲料3日分
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {Members.map((member, index) => (
                  <OtherFamilyMembers
                    Name={member.Name}
                    food={member.food}
                    drink={member.drink}
                    key={index}
                  />
                ))}
              </Box>
            </Box>
            <Box
              position={'absolute'}
              bottom={8}
              right={12}
            >
              <InviteFamilyBtn />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FamilyMemberModal;
