create table accounts (
    id   serial primary key,
    name text not null unique
);

create table transactions (
    id         serial primary key,
    date       date not null default current_date,
    account_id int not null references accounts(id),
    amount     numeric(12,2) not null check (amount > 0),
    expense    text not null,
    created_at timestamptz not null default now()
);

insert into accounts (name) values ('Current'), ('Credit card'), ('Savings');

-- Block the public Supabase API from reading these tables.
-- Our app connects directly as the database owner, so it is unaffected.
alter table accounts enable row level security;
alter table transactions enable row level security;
