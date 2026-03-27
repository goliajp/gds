Publish a new release. Argument: version bump type (patch/minor/major) or explicit version. Default: patch.

Steps:

1. Check `git status` on develop branch. If there are uncommitted changes, stage them and commit with a proper conventional commit message (analyze the diff to determine the type: feat/fix/refactor/chore/etc). If clean, skip.

2. Read the current version from `package.json`. Calculate the new version based on the argument:
   - `patch` (default): 0.1.1 → 0.1.2
   - `minor`: 0.1.1 → 0.2.0
   - `major`: 0.1.1 → 1.0.0
   - explicit (e.g. `2.0.0`): use as-is

3. Update `package.json` version field to the new version.

4. Commit: `chore: bump version to x.y.z`

5. Checkout master, merge develop with `--no-edit`, tag `x.y.z` with message `release x.y.z`, checkout develop.

6. Push: `git push origin master develop --tags`

7. Confirm: print the new version and the GitHub Actions URL so the user can track the publish.

IMPORTANT:
- Must be on `develop` branch at start and end
- Never use `git flow release` commands — do the merge/tag manually for simplicity
- Do NOT run any local checks/tests/build — CI handles everything
- If anything fails, stop immediately and report the error
