defmodule Api.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :first_name, :string
      add :last_name, :string
      add :email, :string
      add :session_token, :uuid
      add :session_expire, :utc_datetime

      timestamps()
    end

  end
end
