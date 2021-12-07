export type Form = {
  displayName: string;
  systemName: string;
  public: boolean;
};

export type Column = {
  displayName: string;
  systemName: string;
};

export type View = {
  displayName: string;
  systemName: string;
  public: boolean;
};

export type Table = {
  displayName: string;
  systemName: string;
  columns: Column[];
  forms: Form[];
  views: View[];
  public: boolean;
};

export type Schema = {
  displayName: string;
  systemName: string;
  tables: Table[];
  public: boolean;
};

const addSystemNameAndRandomPublic = <T extends { displayName: string }>(
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
          addSystemNameAndRandomPublic
        ),
        views: [
          { displayName: "Needs Initial Contact" },
          { displayName: "Escalate to Experienced Organizer" },
          { displayName: "Active Campaigns - Logistics" },
          { displayName: "Active Campaigns - Food Service" },
          { displayName: "Active Campaigns - Non profits" },
        ].map(addSystemNameAndRandomPublic),
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
        ].map(addSystemNameAndRandomPublic),
        views: [{ displayName: "Needs 1-1" }].map(addSystemNameAndRandomPublic),
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
        ].map(addSystemNameAndRandomPublic),
        views: [].map(addSystemNameAndRandomPublic),
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
        ].map(addSystemNameAndRandomPublic),
        views: [
          { displayName: "Upcoming Events" },
          { displayName: "Past Events" },
          { displayName: "Recurring Events" },
          { displayName: "Events Hosted by Volunteers" },
        ].map(addSystemNameAndRandomPublic),
      },
    ].map(addSystemNameAndRandomPublic),
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
          addSystemNameAndRandomPublic
        ),
        views: [
          { displayName: "To Onboard" },
          { displayName: "Inactive - To Re-Engage" },
        ].map(addSystemNameAndRandomPublic),
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
        forms: [].map(addSystemNameAndRandomPublic),
        views: [
          { displayName: "Already VOTED" },
          { displayName: "GOTV Universe" },
          { displayName: "Persuasion Universe" },
        ].map(addSystemNameAndRandomPublic),
      },
    ].map(addSystemNameAndRandomPublic),
  },
].map(addSystemNameAndRandomPublic);
