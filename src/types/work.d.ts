export type Work = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
  date: string;
  role: string;
  tech: string;
  summary: string;
  point: string;
  tool: string;
  icon: {
    url: string;
    height: number;
    width: number;
  };
  shortName: string;
};

export type Works = Work[];
