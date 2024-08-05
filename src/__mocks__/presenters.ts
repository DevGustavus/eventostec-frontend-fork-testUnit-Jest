import { Presenter } from '../app/types/presenter.type';

// Mock de um apresentador único
export const PRESENTER_MOCK: Presenter = {
  id: '1',
  name: 'Carlos Silva',
  nickname: 'Dev Ninja',
  ocupation: 'Desenvolvedor',
  imgUrl:
    'https://www.proway.com.br/foto/png/blog/750/workshop-gratuito-game-developer.jpg',
};

// Mock de uma lista de apresentadores
export const PRESENTERS_MOCK: Presenter[] = [
  {
    id: '1',
    name: 'Carlos Silva',
    nickname: 'Dev Ninja',
    ocupation: 'Desenvolvedor',
    imgUrl:
      'https://www.proway.com.br/foto/png/blog/750/workshop-gratuito-game-developer.jpg',
  },
  {
    id: '2',
    name: 'Ana Pereira',
    nickname: 'Tech Guru',
    ocupation: 'Engenheira de Software',
    imgUrl:
      'https://www.proway.com.br/foto/png/blog/750/workshop-gratuito-game-developer.jpg',
  },
  {
    id: '3',
    name: 'Marcos Souza',
    nickname: 'Data Wizard',
    ocupation: 'Cientista de Dados',
    imgUrl:
      'https://www.proway.com.br/foto/png/blog/750/workshop-gratuito-game-developer.jpg',
  },
];

// Mock de uma resposta de erro para criar apresentador
export const CREATE_PRESENTER_ERROR_RESPONSE_MOCK: {
  status: number;
  statusText: string;
} = {
  status: 422,
  statusText: 'Unprocessable Entity',
};
