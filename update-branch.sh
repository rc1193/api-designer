#!/bin/bash
if [ $# -lt 1 ]
then
  echo "> Missing branch-name param, correct usage is: update <branch-name>"
  exit
fi

# get updated repo for the especified branch
BRANCH=$1
SOURCE_REPO=./_tmp/api-designer-$BRANCH
if [ -d "$SOURCE_REPO" ]; then
	echo "> Updating latest api-designer from branch '$BRANCH' in cache '$SOURCE_REPO'"
	git --git-dir=$SOURCE_REPO/.git fetch
	git --git-dir=$SOURCE_REPO/.git --work-tree=$SOURCE_REPO merge origin/$BRANCH
else	
	echo "> Fetch latest api-designer from branch '$BRANCH' and cache it in '$SOURCE_REPO'"
	mkdir -p $SOURCE_REPO
	git clone -b $BRANCH https://github.com/mulesoft/api-designer.git $SOURCE_REPO
fi

# copy dist
SOURCE_FOLDER=$SOURCE_REPO/dist/
TARGET=./dists/$BRANCH
VERSIONED_TARGET=$TARGET/latest
echo "> Updating '$VERSIONED_TARGET' from '$SOURCE_FOLDER'"
rm -rf $VERSIONED_TARGET
mkdir -p $VERSIONED_TARGET
cp -r $SOURCE_FOLDER $VERSIONED_TARGET

# sanitiza and optimize for standalone web
echo "> Leave empty RAML.Settings.proxy setting from $VERSIONED_TARGET/scripts/api-designer.js"
sed -i '' -e "s/RAML\.Settings\.proxy = '\/proxy\/'/RAML\.Settings\.proxy = ''/g" $VERSIONED_TARGET/scripts/api-designer.js
sed -i '' -e 's/RAML\.Settings\.proxy = "\/proxy\/"/RAML\.Settings\.proxy = ""/g' $VERSIONED_TARGET/scripts/api-designer.min.js
echo "> Use minified versions of css and js"
cp $VERSIONED_TARGET/index.html $VERSIONED_TARGET/dev.html
sed -i '' -e "s/.css/.min.css/g" $VERSIONED_TARGET/index.html
sed -i '' -e "s/api-designer-vendor.js/api-designer-vendor.min.js/g" $VERSIONED_TARGET/index.html # todo api-designer.js fails...

# create md page with branch info
BRANCH_SHA="$(git --git-dir=$SOURCE_REPO/.git rev-parse HEAD)"
BRANCH_SHA_DATE="$(git --git-dir=$SOURCE_REPO/.git show -s --format=%aI $BRANCH_SHA^{commit})"
BRANCH_INFO_MD=./_branchs/$BRANCH.md
echo "> generating branch info file in '$BRANCH_INFO_MD'"
rm $BRANCH_INFO_MD
echo -e "---\nname: $BRANCH\nsha: $BRANCH_SHA\ndate: $BRANCH_SHA_DATE\n---" >> $BRANCH_INFO_MD

# create commit
echo "> review and then run: git add .; git commit -am 'Update $BRANCH to commit $BRANCH_SHA'; git push origin gh-pages"
