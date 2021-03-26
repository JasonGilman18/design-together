# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Api.Repo.insert!(%Api.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Api.Repo
alias Api.Directory.Business

Repo.insert!(%Business{name: "Company 1", description: "Short description...", tag: "Software"})

Repo.insert! (%Business{name: "Company 2", description: "Short Description...", tag: "Marketing"})

Repo.insert! (%Business{name: "Company 3", description: "Short Description...", tag: "Accounting"})
