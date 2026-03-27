Publish a new release. Argument: version bump type (patch/minor/major) or explicit version. Default: patch.

Steps:

1. Check `git status` on develop branch. If there are uncommitted changes, stage them and commit with a proper conventional commit message (analyze the diff to determine the type: feat/fix/refactor/chore/etc). If clean, skip.

2. Read the current version from `package.json`. Calculate the new version based on the argument:
   - `patch` (default): 0.1.1 → 0.1.2
   - `minor`: 0.1.1 → 0.2.0
   - `major`: 0.1.1 → 1.0.0
   - explicit (e.g. `2.0.0`): use as-is

3. Update `package.json` version field to the new version.

4. Update `CHANGELOG.md`:
   - Run `git log <last-tag>..HEAD --oneline` to get all commits since last release
   - Add a new section at the top (below the header), formatted as:
     ```
     ## [x.y.z] - YYYY-MM-DD

     ### Added
     - feat commits

     ### Fixed
     - fix commits

     ### Changed
     - refactor/chore/perf/other commits
     ```
   - Only include sections that have entries. Skip `chore: bump version` commits.
   - Keep descriptions concise — use the commit message as-is, no embellishment.

5. Commit: `chore: bump version to x.y.z`

6. Checkout master, merge develop with `--no-edit`, tag `x.y.z` with message `release x.y.z`, checkout develop.

7. Push: `git push origin master develop --tags`

8. Confirm: print the new version and the GitHub Actions URL so the user can track the publish.

IMPORTANT:
- Must be on `develop` branch at start and end
- Never use `git flow release` commands — do the merge/tag manually for simplicity
- Do NOT run any local checks/tests/build — CI handles everything
- If anything fails, stop immediately and report the error
