/**
 * 'types.ts'
 *
 * Outlines the specific type guards used in the MCP Server
 */

export type ShortFormDeckData = {
  coverSlideProps: {
    companyName: string;
    tagline: string;
  };
  introSlideProps: string;
  problemSlideProps: string[];
  solutionSlideProps: string[];
  marketSlideProps: string[];
  tractionSlideProps: string[];
  askSlideProps: string[];
};
