#! /bin/ksh93
# rename files with number prefixes so that they are easily sorted into a
# natural alphabetical order.
#
# Note that this script will need AT&T ksh93, mirBSD ksh (mksh), or a similar
# ksh-like shell to work properly due to typeset.

# get path to file without the name of the script itself
# this will fail if your path has an "@" in it, so don't do that. Please.

export PATHTOSORT="$(readlink -f "$0"|sed 's@'"`basename "$0"`"'@@g')"
cd "$PATHTOSORT"
echo "sorting ""$PATHTOSORT""..."

echo
echo "Removing existing numerical prefixes. Ignore errors in this stage:"
for file in [0-9][0-9][0-9]"_"*.txt; do
  export NEWNAME=$(echo "$file" | sed 's/[0-9][0-9][0-9]_//g')
  mv -v "$file" "$NEWNAME"
done

# yeah I know I shouldn't parse ls. But at least this way it's not gonna ruin
# EVERYTHING.
unalias ls
alias ls='ls -N'
echo
echo "renaming alphabetically-sorted files into numerical order:"
typeset -Z 3 PADNUM #zero-pad $PADNUM to 3 spaces
PADNUM=1
for file in $(ls *.txt | sort -f) ; do
	mv -v "$file" "$PADNUM""_""$file"
  PADNUM=`expr "$PADNUM" '+' "1"`
done
echo "done."
