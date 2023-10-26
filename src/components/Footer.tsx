import { Container } from '.';
import { telegramIcon } from '../assets';

export const Footer = () => {
  return (
    <footer className="bg-gray-700 text-center">
      <Container>
        <div className="flex gap-2 justify-center items-center py-8">
          <p className="text-gray-300">
            ©{new Date().getFullYear()} Sergey Zhilinsky
          </p>
          <a
            className="hover:bg-gray-500 rounded"
            href="https://t.me/Freeman198x"
            target="_blank"
          >
            <img src={telegramIcon} alt="Telegram" height={20} width={20} />
          </a>
        </div>
      </Container>
    </footer>
  );
};
