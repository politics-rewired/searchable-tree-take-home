import { search } from '../search';

describe('search()', () => {
  let searchTerm, result, expected;

  const data = [{
    displayName: 'Worker Intake',
    systemName: 'worker-intake',
    children: [
      {
        displayName: 'Workers',
        systemName: 'workers',
        children: [
          { displayName: 'First Name', systemName: 'first_name' },
          { displayName: 'Last Name', systemName: 'last_name' },
          { displayName: 'Workplace', systemName: 'workplace' },
          { displayName: 'Industry', systemName: 'industry' }
        ]
      },
      {
        displayName: 'Volunteers',
        systemName: 'volunteers',
        children: [
          { displayName: 'First Name', systemName: 'first_name' },
          { displayName: 'Last Name', systemName: 'last_name' },
          { displayName: 'Experience Level', systemName: 'experience_level' },
          { displayName: 'Team', systemName: 'team' },
        ]
      }
    ]
  }];

  it('returns the filtered result', () => {
    searchTerm = 'name';
    result = search(data, searchTerm);

    expected = [{
      displayName: 'Worker Intake',
      systemName: 'worker-intake',
      children: [
        {
          displayName: 'Workers',
          systemName: 'workers',
          children: [
            { displayName: 'First Name', systemName: 'first_name' },
            { displayName: 'Last Name', systemName: 'last_name' }
          ]
        },
        {
          displayName: 'Volunteers',
          systemName: 'volunteers',
          children: [
            { displayName: 'First Name', systemName: 'first_name' },
            { displayName: 'Last Name', systemName: 'last_name' }
          ]
        }
      ]
    }];

    expect(result).toEqual(expected);
  });

  describe('when searchTerm is empty', () => {
    it('does not change data', () => {
      searchTerm = '  ';

      result = search(data, searchTerm);

      expect(result).toEqual(data);
    });
  });

  describe('when searchTerm is not given', () => {
    it('does not change data', () => {
      result = search(data);

      expect(result).toEqual(data);
    });
  });
});
