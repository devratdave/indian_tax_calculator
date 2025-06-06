import { Comment, TaxDetails } from "../_types"

export const addComment = async (name: string, comment: string): Promise<Comment> => {
  try {
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name, comment
      })
  });
    const data = await response.json();
    console.log('data', data);
    return data.response

  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('Failed to add comment. Please try again.');
  }
};

export const getComments = async (): Promise<Comment[]> => {
  try {
    const response = await fetch('/api/comments', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response?.json()
    return data?.response

  } catch (error) {
    console.error('Error fetching comments:', error);
    throw new Error('Failed to fetch comments. Please try again.');
  }
};

export const calculateTax = async (
  income: number,
  regime: 'old' | 'new',
  investments: { [key: string]: number }
): Promise<TaxDetails> => {   
  try {
    const response = await fetch(`/api/calculate-tax`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        income,
        regime,
        investments
      })
    });
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error('Error calculating tax:', error);
    throw new Error('Failed to calculate tax. Please try again.');
  }
};