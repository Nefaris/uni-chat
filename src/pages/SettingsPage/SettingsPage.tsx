import { useState, VFC } from 'react';
import { HeadingLarge, LabelSmall } from 'baseui/typography';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import {
  Modal, ModalBody, ModalButton, ModalFooter, ModalHeader,
} from 'baseui/modal';
import { PinCode } from 'baseui/pin-code';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

const SettingsPage: VFC = () => {
  const {
    deleteAccount,
    changePinCode,
  } = useAuth();

  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
  const [isDeleteAccountPending, setIsDeleteAccountPending] = useState(false);

  const [isChangePinCodeModalOpen, setIsChangePinCodeModalOpen] = useState(false);
  const [newPinCode, setNewPinCode] = useState(['', '', '', '']);
  const [isChangePinCodePending, setIsChangePinCodePending] = useState(false);

  const handleDeleteAccount = async () => {
    if (isDeleteAccountPending) return;
    setIsDeleteAccountPending(true);

    try {
      await deleteAccount();
    } finally {
      setIsDeleteAccountPending(false);
    }
  };

  const handleChangePinCode = async () => {
    setIsChangePinCodePending(true);

    try {
      await changePinCode(newPinCode.join(''));
      setIsChangePinCodePending(false);
      setIsChangePinCodeModalOpen(false);
      setNewPinCode(['', '', '', '']);
    } finally {
      setIsChangePinCodePending(false);
    }
  };

  const handleCloseDeleteAccountModal = () => {
    setIsDeleteAccountModalOpen(false);
  };

  const handleCloseChangePinCodeModal = () => {
    setIsChangePinCodeModalOpen(false);
    setNewPinCode(['', '', '', '']);
  };

  const handleOpenDeleteAccountModal = () => {
    setIsDeleteAccountModalOpen(true);
  };

  const handleOpenChangePinCodeModal = () => {
    setIsChangePinCodeModalOpen(true);
  };

  const {
    logout,
    currentUser,
  } = useAuth();

  return (
    <>
      <div className="max-w-xl mx-auto px-6 py-6">
        <header className="flex items-center justify-between mb-6">
          <HeadingLarge>Settings</HeadingLarge>
          <Link to="/chat">
            <Button size="compact">Go back</Button>
          </Link>
        </header>

        <main className="flex flex-col mt-12">
          <div className="grid gap-1">
            <LabelSmall>Username</LabelSmall>
            <Input value={currentUser?.username} disabled />
          </div>

          <div className="grid gap-2 mt-6">
            <Button onClick={handleOpenDeleteAccountModal}>Delete account</Button>
            <Button onClick={handleOpenChangePinCodeModal}>Change pin code</Button>
            <Button onClick={logout}>Logout</Button>
          </div>
        </main>
      </div>

      <Modal
        onClose={handleCloseDeleteAccountModal}
        closeable={!isDeleteAccountPending}
        isOpen={isDeleteAccountModalOpen}
        animate
        autoFocus
      >
        <ModalHeader>Delete account</ModalHeader>
        <ModalBody>
          <p>
            Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare faucibus ex, non
            facilisis nisl. Maecenas aliquet mauris ut tempus.
          </p>
        </ModalBody>
        <ModalFooter>
          <ModalButton
            kind="secondary"
            disabled={isDeleteAccountPending}
            onClick={handleCloseDeleteAccountModal}
          >
            Cancel
          </ModalButton>
          <ModalButton
            disabled={isDeleteAccountPending}
            isLoading={isDeleteAccountPending}
            onClick={handleDeleteAccount}
          >
            Confirm
          </ModalButton>
        </ModalFooter>
      </Modal>

      <Modal
        onClose={handleCloseChangePinCodeModal}
        closeable={!isChangePinCodePending}
        isOpen={isChangePinCodeModalOpen}
        animate
        autoFocus
      >
        <ModalHeader>Change pin code</ModalHeader>
        <ModalBody>
          <p className="mb-4">
            Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare faucibus ex, non
            facilisis nisl. Maecenas aliquet mauris ut tempus.
          </p>

          <PinCode
            mask
            values={newPinCode}
            disabled={isChangePinCodePending}
            onChange={({ values }) => setNewPinCode(values)}
            clearOnEscape
          />
        </ModalBody>
        <ModalFooter>
          <ModalButton
            disabled={isChangePinCodePending}
            onClick={handleCloseChangePinCodeModal}
            kind="secondary"
          >
            Cancel
          </ModalButton>
          <ModalButton disabled={isChangePinCodePending} onClick={handleChangePinCode}>
            Confirm
          </ModalButton>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default SettingsPage;
