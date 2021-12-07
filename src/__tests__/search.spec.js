import { search } from '../search';

describe('search()', () => {
  let searchTerm, result, expected;

  it('returns the filtered result', () => {
    const data = [{
      displayName: 'Worker Intake',
      systemName: 'worker-intake',
      children: [
        {
          displayName: 'Workers',
          systemName: 'workers',
          children: [
            {
              displayName: 'Columns',
              systemName: 'columns',
              children: [
                { displayName: 'First Name', systemName: 'first_name' },
                { displayName: 'Last Name', systemName: 'last_name' },
                { displayName: 'Workplace', systemName: 'workplace' },
                { displayName: 'Industry', systemName: 'industry' }
              ]
            }
          ]
        },
        {
          displayName: 'Volunteers',
          systemName: 'volunteers',
          children: [
            {
              displayName: 'Columns',
              systemName: 'columns',
              children: [
                { displayName: 'First Name', systemName: 'first_name' },
                { displayName: 'Last Name', systemName: 'last_name' },
                { displayName: 'Experience Level', systemName: 'experience_level' },
                { displayName: 'Team', systemName: 'team' },
              ]
            }
          ]
        }
      ]
    }];

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
            {
              displayName: 'Columns',
              systemName: 'columns',
              children: [
                { displayName: 'First Name', systemName: 'first_name' },
                { displayName: 'Last Name', systemName: 'last_name' }
              ]
            }
          ]
        },
        {
          displayName: 'Volunteers',
          systemName: 'volunteers',
          children: [
            {
              displayName: 'Columns',
              systemName: 'columns',
              children: [
                { displayName: 'First Name', systemName: 'first_name' },
                { displayName: 'Last Name', systemName: 'last_name' }
              ]
            }
          ]
        }
      ]
    }];

    expect(result).toEqual(expected);
  });

  describe('when searchTerm is empty', () => {
    it('does not change data', () => {
      const data = [{
        displayName: 'Worker Intake',
        systemName: 'worker-intake',
        children: [
          {
            displayName: 'Workers',
            systemName: 'workers',
            children: [
              {
                displayName: 'Columns',
                systemName: 'columns',
                children: [
                  { displayName: 'First Name', systemName: 'first_name' },
                  { displayName: 'Last Name', systemName: 'last_name' },
                  { displayName: 'Workplace', systemName: 'workplace' },
                  { displayName: 'Industry', systemName: 'industry' }
                ]
              }
            ]
          }
        ]
      }];

      searchTerm = '  ';

      result = search(data, searchTerm);

      expect(result).toEqual(data);
    });
  });

  describe('when searchTerm is not given', () => {
    it('does not change data', () => {
      const data = [{
        displayName: 'Worker Intake',
        systemName: 'worker-intake',
        children: [
          {
            displayName: 'Workers',
            systemName: 'workers',
            children: [
              {
                displayName: 'Columns',
                systemName: 'columns',
                children: [
                  { displayName: 'First Name', systemName: 'first_name' },
                  { displayName: 'Last Name', systemName: 'last_name' },
                  { displayName: 'Workplace', systemName: 'workplace' },
                  { displayName: 'Industry', systemName: 'industry' }
                ]
              }
            ]
          }
        ]
      }];

      result = search(data);

      expect(result).toEqual(data);
    });
  });

  describe('when onlyPublic is true', () => {
    describe('when searchTerm is not given', () => {
      it('returns only public items', () => {
        const data = [{
          displayName: 'Worker Intake',
          systemName: 'worker-intake',
          public: true,
          children: [
            {
              displayName: 'Workers',
              systemName: 'workers',
              children: [
                {
                  displayName: 'Columns',
                  systemName: 'columns',
                  children: [
                    { displayName: 'First Name', systemName: 'first_name', public: true },
                    { displayName: 'Last Name', systemName: 'last_name', public: false },
                    { displayName: 'Workplace', systemName: 'workplace' },
                    { displayName: 'Industry', systemName: 'industry' }
                  ]
                }
              ]
            }
          ]
        }];

        result = search(data, '', true);

        expected = [{
          displayName: 'Worker Intake',
          systemName: 'worker-intake',
          public: true,
          children: [
            {
              displayName: 'Workers',
              systemName: 'workers',
              children: [
                {
                  displayName: 'Columns',
                  systemName: 'columns',
                  children: [
                    { displayName: 'First Name', systemName: 'first_name', public: true },
                    { displayName: 'Workplace', systemName: 'workplace' },
                    { displayName: 'Industry', systemName: 'industry' }
                  ]
                }
              ]
            }
          ]
        }];

        expect(result).toEqual(expected);
      });
    });

    describe('when searchTerm is given', () => {
      it('returns only public items that match the search term', () => {
        const data = [{
          displayName: 'Worker Intake',
          systemName: 'worker-intake',
          public: true,
          children: [
            {
              displayName: 'Workers',
              systemName: 'workers',
              children: [
                {
                  displayName: 'Columns',
                  systemName: 'columns',
                  children: [
                    { displayName: 'First Name', systemName: 'first_name', public: true },
                    { displayName: 'Last Name', systemName: 'last_name', public: false },
                    { displayName: 'Workplace', systemName: 'workplace' },
                    { displayName: 'Industry', systemName: 'industry' }
                  ]
                }
              ]
            }
          ]
        }];

        searchTerm = 'name';

        result = search(data, searchTerm, true);

        expected = [{
          displayName: 'Worker Intake',
          systemName: 'worker-intake',
          public: true,
          children: [
            {
              displayName: 'Workers',
              systemName: 'workers',
              children: [
                {
                  displayName: 'Columns',
                  systemName: 'columns',
                  children: [
                    { displayName: 'First Name', systemName: 'first_name', public: true },
                  ]
                }
              ]
            }
          ]
        }];

        expect(result).toEqual(expected);
      });
    });
  });
});
