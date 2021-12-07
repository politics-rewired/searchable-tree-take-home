import { search } from '../search';

describe('search()', () => {
  let data, searchTerm, result, expected;

  data = [{
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

  searchTerm = 'first_name';

  result = search(data, searchTerm);

  expected = [{
    displayName: 'Worker Intake',
    systemName: 'worker-intake',
    children: [
      {
        displayName: 'Workers',
        systemName: 'workers',
        children: [
          { displayName: 'First Name', systemName: 'first_name' }
        ]
      },
      {
        displayName: 'Volunteers',
        systemName: 'volunteers',
        children: [
          { displayName: 'First Name', systemName: 'first_name' }
        ]
      }
    ]
  }];

  it('returns the filtered result', () => {
    expect(result).toEqual(expected);
  });
});
