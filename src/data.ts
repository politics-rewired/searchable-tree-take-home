export interface NamedEntity {
  displayName: string
  systemName: string
}

export interface Form extends NamedEntity  {
  public: boolean
}

export type Column = NamedEntity

export interface View extends NamedEntity{
  public: boolean;
};

export interface Table extends NamedEntity {
  columns: Column[];
  forms: Form[];
  views: View[];
  public: boolean;
};

export interface Schema extends NamedEntity {
  tables: Table[];
  public: boolean;
};

const addSystemNameAndRandomPulic = <T extends { displayName: string }>(
  item: T
): T & { systemName: string; public: boolean } => {
  return {
    systemName: item.displayName.toLowerCase().replace(/ /g, "_"),
    public: Math.random() > 0.5 ? true : false,
    ...item,
  };
};

const addSystemName = <T extends { displayName: string }>(
  item: T
): T & { systemName: string } => {
  return {
    systemName: item.displayName.toLowerCase().replace(/ /g, "_"),
    ...item,
  };
};

export const testData: Schema[] = [
  {
    displayName: "Worker Intake",
    tables: [
      {
        displayName: "Workers",
        columns: [
          { displayName: "First Name" },
          { displayName: "Last Name" },
          { displayName: "Workplace" },
          { displayName: "Industry" },
        ].map(addSystemName),
        forms: [{ displayName: "Get Help Organizing Your Workplace" }].map(
          addSystemNameAndRandomPulic
        ),
        views: [
          { displayName: "Needs Initial Contact" },
          { displayName: "Escalate to Experienced Organizer" },
          { displayName: "Active Campaigns - Logistics" },
          { displayName: "Active Campaigns - Food Service" },
          { displayName: "Active Campaigns - Non profits" },
        ].map(addSystemNameAndRandomPulic),
      },
      {
        displayName: "Volunteers",
        columns: [
          { displayName: "First Name" },
          { displayName: "Last Name" },
          { displayName: "Experience Level" },
          { displayName: "Team" },
        ].map(addSystemName),
        forms: [
          { displayName: "Join the Calling Team" },
          { displayName: "Join the Outreach Team" },
        ].map(addSystemNameAndRandomPulic),
        views: [{ displayName: "Needs 1-1" }].map(addSystemNameAndRandomPulic),
      },
      {
        displayName: "Contact Logs",
        columns: [
          { displayName: "Worker" },
          { displayName: "Volunteer" },
          { displayName: "Contacted At" },
          { displayName: "Outcome" },
        ].map(addSystemName),
        forms: [
          { displayName: "Record a Initial Outreach Conversation" },
          { displayName: "Record a Campaign Update" },
        ].map(addSystemNameAndRandomPulic),
        views: [].map(addSystemNameAndRandomPulic),
      },
      {
        displayName: "Events",
        columns: [
          { displayName: "Title" },
          { displayName: "Description" },
          { displayName: "Starts At" },
          { displayName: "Attendee Limit" },
          { displayName: "Host" },
        ].map(addSystemName),
        forms: [
          { displayName: "RSVP to An Event" },
          { displayName: "Host an Event" },
        ].map(addSystemNameAndRandomPulic),
        views: [
          { displayName: "Upcoming Events" },
          { displayName: "Past Events" },
          { displayName: "Recurring Events" },
          { displayName: "Events Hosted by Volunteers" },
        ].map(addSystemNameAndRandomPulic),
      },
    ].map(addSystemNameAndRandomPulic),
  },
  {
    displayName: "Gene Parmesan for Congress",
    tables: [
      {
        displayName: "Volunteers",
        columns: [
          { displayName: "First Name" },
          { displayName: "Last Name" },
          { displayName: "Team" },
          { displayName: "Onboarding Status" },
          { displayName: "Activity Status" },
        ].map(addSystemName),
        forms: [{ displayName: "Sign Up to Volunteer" }].map(
          addSystemNameAndRandomPulic
        ),
        views: [
          { displayName: "To Onboard" },
          { displayName: "Inactive - To Re-Engage" },
        ].map(addSystemNameAndRandomPulic),
      },
      {
        displayName: "Voters",
        columns: [
          { displayName: "First Name" },
          { displayName: "Last Name" },
          { displayName: "Party" },
          { displayName: "Registration Date" },
          { displayName: "Age" },
          { displayName: "Support Score" },
        ].map(addSystemName),
        forms: [].map(addSystemNameAndRandomPulic),
        views: [
          { displayName: "Already VOTED" },
          { displayName: "GOTV Universe" },
          { displayName: "Persuasion Universe" },
        ].map(addSystemNameAndRandomPulic),
      },
    ].map(addSystemNameAndRandomPulic),
  },
].map(addSystemNameAndRandomPulic);
