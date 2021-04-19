defmodule Api.Repo.Migrations.CreateMembers do
  use Ecto.Migration

  def change do
    create table(:members) do
      add :owner, :boolean, default: false, null: false
      add :read_only, :boolean, default: false, null: false
      add :user_id, references(:users, on_delete: :nothing)
      add :document_id, references(:documents, on_delete: :nothing)

      timestamps()
    end

    create unique_index(:members, [:user_id, :document_id])
  end
end
