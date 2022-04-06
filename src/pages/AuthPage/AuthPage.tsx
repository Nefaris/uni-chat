import { ChangeEvent, useState, VFC } from 'react';
import { Input } from 'baseui/input';
import { PinCode } from 'baseui/pin-code';
import { Button } from 'baseui/button';
import { HeadingLarge, LabelSmall, ParagraphSmall } from 'baseui/typography';
import { useAuth } from '../../providers/AuthProvider';

const AuthPage: VFC = () => {
  const { authenticate } = useAuth();
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState(['', '', '', '']);
  const [isAuthPending, setIsAuthPending] = useState(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

  const isFormValid = usernameValue.length > 0 && passwordValue.filter(val => val !== '').length === 4;

  const handleAuthSubmit = async () => {
    if (!isFormValid || isAuthPending) return;

    setIsAuthPending(true);

    try {
      await authenticate(usernameValue, passwordValue.join(''));
    } catch (err) {
      setIsPasswordInvalid(true);
    } finally {
      setIsAuthPending(false);
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsernameValue(e.target.value);
  };

  const handlePasswordChange = (values: string[]) => {
    setPasswordValue(values);
    setIsPasswordInvalid(false);
  };

  return (
    <div className='max-w-md mx-auto px-6 py-12'>
      <HeadingLarge>Authenticate</HeadingLarge>
      <ParagraphSmall className='mt-2'>
        If you already have an account, enter your username and pin, if you don&apos;t have an
        account, follow the same steps and your account will be created!
      </ParagraphSmall>

      <div className='flex flex-col mt-12'>
        <LabelSmall className='mb-2'>Enter your username</LabelSmall>
        <Input
          disabled={isAuthPending}
          value={usernameValue}
          onChange={handleUsernameChange}
          placeholder='Username'
        />

        <div className='mt-6'>
          <LabelSmall className='mb-2'>Enter your pin code</LabelSmall>
          <PinCode
            error={isPasswordInvalid}
            disabled={usernameValue.length === 0 || isAuthPending}
            values={passwordValue}
            onChange={({ values }) => handlePasswordChange(values)}
            clearOnEscape
            mask
          />
        </div>

        <div className='flex flex-col mt-6'>
          <Button
            isLoading={isAuthPending}
            disabled={!isFormValid || isAuthPending}
            onClick={handleAuthSubmit}
          >
            Auth
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
